import { useState } from 'react';
import { PianoInterpreter } from '../../utils/fileInterpreter';
import Center from '../Center/Center';
import MenuBox from '../MenuBox/MenuBox';
import MenuButton from '../MenuButton/MenuButton';
import MenuOption from '../MenuOption/MenuOption';
import Piano from '../Piano/Piano';
import UploadFile from '../UploadFile/UploadFile';

function App() {
  const [fileContent, setFileContent] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("No Song Playing.");
  const playSong = async (fileContent: string) => {
    if (!fileContent) {
      setFeedbackMessage("No Song Loaded.");
      return;
    }
    const interpreter = new PianoInterpreter(fileContent);
    try {
      setFeedbackMessage("Playing...");
      await interpreter.play();
      setFeedbackMessage("No Song Playing.");
    } catch (error: any) {
      setFeedbackMessage(error.message);
    }
  }
  return (
    <>
      <Center>
        <Piano />
        <MenuBox>
          <MenuOption title="Change Instrument">
            Choose which instrument you want to use.
          </MenuOption>
          <MenuOption title="Load Files">
            Load '.piano' files and enjoy songs!
            <MenuButton onClick={() => {
              document.getElementById("fileUpload")?.click();
            }}>
              Load a File
            </MenuButton>
            <UploadFile id="fileUpload" onChange={(fileContent) => {
              setFileContent(fileContent);
            }} />
          </MenuOption>
          <MenuOption title="Play!">
            Click the 'Play!' button to start the music!
            <MenuButton onClick={async () => {
              await playSong(fileContent);
            }}>
              Play!
            </MenuButton>
            {feedbackMessage}
          </MenuOption>
        </MenuBox>
      </Center>
    </>
  );
}

export default App;
