import { useState } from 'react';
import { PianoInterpreter } from '../../utils/fileInterpreter';
import Center from '../Center/Center';
import MenuBox from '../MenuBox/MenuBox';
import MenuButton from '../MenuButton/MenuButton';
import MenuOption from '../MenuOption/MenuOption';
import MenuSelect from '../MenuSelect/MenuSelect';
import Piano from '../Piano/Piano';
import UploadFile from '../UploadFile/UploadFile';
import { createGlobalInstrument, instrumentsList } from '../../utils/audioHandler';
import { InstrumentName } from 'soundfont-player';
import { getGlobalFileContent, getGlobalInstrument } from '../../utils/globals';

function App() {
  const UPLOAD_FILE_INPUT_ID = "fileUpload";
  const [fileName, setFileName] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const playSong = async (fileContent: string) => {
    if (!fileName || !fileContent) {
      return;
    }
    const interpreter = new PianoInterpreter(fileContent);
    try {
      setFeedbackMessage("");
      await interpreter.play();
    } catch (error: any) {
      setFeedbackMessage(error.message);
    }
  }
  const formatFileName = (fileName: string): string => {
    fileName = fileName.replace(".piano", "");
    fileName = fileName.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
    return fileName;
  }
  const changeInstrument = async (instrumentName: string) => {
    if (instrumentsList.includes(instrumentName)) {
      await createGlobalInstrument(instrumentName as InstrumentName);
    }
  }
  return (
    <>
      <Center>
        <Piano />
        <MenuBox>
          <MenuOption title="How to Play">
            Click the piano keys with the mouse or use your keyboard to play.
            Drag the mouse to reach lower or higher notes.
          </MenuOption>
          <MenuOption title="Instruments">
            Choose which instrument to use.
            <MenuSelect options={instrumentsList} inputId="instrumentsInput" datalistId="instrumentsList" initialValue={getGlobalInstrument()} onChange={async instrumentName => {
              await changeInstrument(instrumentName);
            }} />
          </MenuOption>
          <MenuOption title="Load Files">
            Load '.piano' files and enjoy songs!
            <MenuButton onClick={() => {
              document.getElementById(UPLOAD_FILE_INPUT_ID)?.click();
            }}>
              Load a File
            </MenuButton>
            <UploadFile id={UPLOAD_FILE_INPUT_ID} onChange={(fileName, fileContent) => {
              setFileName(fileName);
            }} />
          </MenuOption>
          <MenuOption title="Play">
            Click the 'Play!' button to start the music!
            <MenuButton onClick={async () => {
              await playSong(getGlobalFileContent());
            }} disabled={!fileName}>
              {fileName ? `Play ${formatFileName(fileName)}` : "No File Loaded"}
            </MenuButton>
            {feedbackMessage}
          </MenuOption>
        </MenuBox>
      </Center>
    </>
  );
}

export default App;
