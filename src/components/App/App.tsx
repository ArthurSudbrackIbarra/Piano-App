import { Button } from '@mui/material';
import Center from '../Center/Center';
import Piano from '../Piano/Piano';

function App() {
  return (
    <>
      <Center>
        <Piano />
        <Button
          variant="contained"
          component="label"
          color='success'
        >
          Load .piano File
          <input
            type="file"
            hidden
            accept='.piano'
            onChange={(e) => {
              if (e.target.files) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                  if (e.target && e.target.result) {
                    const data = e.target.result;
                    console.log(data);
                  }
                }
                reader.readAsText(file);
              }
            }}
          />
        </Button>
      </Center>
    </>
  );
}

export default App;
