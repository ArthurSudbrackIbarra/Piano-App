import { useState } from "react";

type UploadFileProps = {
    id: string;
    onChange: (fileContent: string) => void;
}

function UploadFile(props: UploadFileProps) {
    const [fileName, setFileName] = useState('No File Loaded.');
    return (
        <>
            <input
                id={props.id}
                type="file"
                accept='.piano'
                multiple={false}
                hidden
                onChange={event => {
                    if (event.target.files) {
                        const file = event.target.files[0];
                        setFileName(file.name);
                        const reader = new FileReader();
                        reader.onload = event => {
                            if (event.target && event.target.result) {
                                const fileContent = event.target.result as string;
                                props.onChange(fileContent);
                            }
                        }
                        reader.readAsText(file);
                    }
                }}
            />
            {fileName}
        </>
    );
}

export default UploadFile;
