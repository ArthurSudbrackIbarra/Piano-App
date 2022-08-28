import { useState } from 'react';
import { PianoInterpreter } from '../../utils/fileInterpreter';
import Center from '../Center/Center';
import MenuBox from '../MenuBox/MenuBox';
import MenuButton from '../MenuButton/MenuButton';
import MenuOption from '../MenuOption/MenuOption';
import MenuSelect from '../MenuSelect/MenuSelect';
import Piano from '../Piano/Piano';
import UploadFile from '../UploadFile/UploadFile';
import { instrumentsList } from '../../utils/audioHandler';

function App() {
  const UPLOAD_FILE_INPUT_ID = "fileUpload";
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
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
            <MenuSelect options={instrumentsList} datalistId="instrumentsList" />
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
              setFileContent(fileContent);
            }} />
          </MenuOption>
          <MenuOption title="Play">
            Click the 'Play!' button to start the music!
            <MenuButton onClick={async () => {
              await playSong(fileContent);
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
