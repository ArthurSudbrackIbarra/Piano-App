import { useState } from "react";
import { PianoInterpreter } from "../../utils/fileInterpreter";
import Center from "../Center/Center";
import MenuBox from "../MenuBox/MenuBox";
import MenuButton from "../MenuButton/MenuButton";
import MenuOption from "../MenuOption/MenuOption";
import MenuSelect from "../MenuSelect/MenuSelect";
import Piano from "../Piano/Piano";
import UploadFile from "../UploadFile/UploadFile";
import {
  createGlobalInstrument,
  instrumentsList,
} from "../../utils/audioHandler";
import { InstrumentName } from "soundfont-player";
import {
  getGlobalInstrument,
  getGlobalSampleName,
  getGlobalSongNotes,
  setGlobalInstrument,
  setGlobalSampleName,
  setGlobalSongNotes,
  setLastPlayedLineGlobal,
  setSongPausedGlobal,
} from "../../utils/globals";
import samples from "../../assets/samples-as-code/samples";
import Controls, { updatePlayPauseButton } from "../Controls/Controls";

function App() {
  const UPLOAD_FILE_INPUT_ID = "fileUpload";
  const [songName, setSongName] = useState("");
  const playSong = async (songNotes: string) => {
    if (!songName || !songNotes) {
      return;
    }
    const interpreter = new PianoInterpreter(songNotes);
    try {
      await interpreter.play();
    } catch (error: any) {
      alert(error.message);
    }
  };
  const formatFileName = (fileName: string): string => {
    fileName = fileName.replace(".piano", "");
    fileName = fileName.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
    return fileName;
  };
  const changeInstrument = async (instrumentName: string) => {
    if (instrumentsList.includes(instrumentName)) {
      await createGlobalInstrument(instrumentName as InstrumentName);
      setGlobalInstrument(instrumentName);
    }
  };
  const samplesList = Array.from(samples.keys());
  return (
    <>
      <Controls />
      <Center>
        <Piano />
        <MenuBox>
          <MenuOption
            title="Tutorial"
            description="Click the piano keys with the mouse or use your keyboard to play.
            Hold Shift and drag the mouse to reach lower or higher notes. Use Enter to toggle sustain of/off."
          ></MenuOption>
          <MenuOption
            title="Instruments"
            description="Choose which instrument to use from a variety of 127 instruments."
          >
            <MenuSelect
              options={instrumentsList}
              inputId="instrumentsInput"
              datalistId="instrumentsList"
              initialValue={getGlobalInstrument()}
              onChange={async (instrumentName) => {
                setGlobalInstrument(instrumentName);
                await changeInstrument(instrumentName);
              }}
            />
          </MenuOption>
          <MenuOption
            title="Load Songs"
            description="Load '.piano' files or select example samples and let the piano play by itself!"
          >
            <MenuButton
              onClick={() => {
                document.getElementById(UPLOAD_FILE_INPUT_ID)?.click();
              }}
              marginBottom="0.5rem"
            >
              Load From File
            </MenuButton>
            <MenuSelect
              options={samplesList}
              inputId="samplesInput"
              datalistId="samplesList"
              initialValue={getGlobalSampleName()}
              onChange={(sampleName) => {
                const notes = samples.get(sampleName);
                if (notes) {
                  setSongName(sampleName);
                  setGlobalSampleName(sampleName);
                  setGlobalSongNotes(notes);
                  setLastPlayedLineGlobal(0);
                }
              }}
            />
            <UploadFile
              id={UPLOAD_FILE_INPUT_ID}
              onChange={(fileName, fileContent) => {
                setSongName(fileName);
                setGlobalSongNotes(fileContent);
                setGlobalSampleName("");
                setLastPlayedLineGlobal(0);
              }}
            />
          </MenuOption>
          <MenuOption
            title="Play"
            description="Click the 'Play!' button to start the song that you've loaded and enjoy it!"
          >
            <MenuButton
              onClick={async () => {
                setSongPausedGlobal(false);
                updatePlayPauseButton();
                await playSong(getGlobalSongNotes());
              }}
              disabled={!songName}
            >
              {songName ? `Play ${formatFileName(songName)}` : "No Song Loaded"}
            </MenuButton>
          </MenuOption>
        </MenuBox>
      </Center>
    </>
  );
}

export default App;
