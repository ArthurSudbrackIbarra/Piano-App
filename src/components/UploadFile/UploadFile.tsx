import { setGlobalFileContent, setGlobalFileName } from "../../utils/globals";

type UploadFileProps = {
    id: string;
    onChange: (fileName: string, fileContent: string) => void;
}

function UploadFile(props: UploadFileProps) {
    return (
        <>
            <input
                id={props.id}
                type="file"
                accept=".piano"
                multiple={false}
                hidden
                onChange={event => {
                    if (event.target.files) {
                        const file = event.target.files[0];
                        const reader = new FileReader();
                        reader.onload = event => {
                            if (event.target && event.target.result) {
                                const fileContent = event.target.result as string;
                                setGlobalFileName(file.name);
                                setGlobalFileContent(fileContent);
                                props.onChange(file.name, fileContent);
                            }
                        }
                        reader.readAsText(file);
                    }
                }}
            />
        </>
    );
}

export default UploadFile;
