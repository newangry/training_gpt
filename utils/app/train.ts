import PizZip, { LoadData } from 'pizzip';
import Docxtemplater from 'docxtemplater';
import * as XLSX from "xlsx";
import PDFParse from 'pdf-parse';
import { Source } from '@/types/train';


export const train = async (
    text: string,
    brand_id: string,
    source_id: string,
    url: string,
    type: string,
    page_name?: string,
) => {
    try {
        const res = await fetch("/api/train_file", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text
            }),
        });
        if (!res.ok) {
        }
        return res;
    } catch (e) {
        console.log(e);
    }
    return { status: '201' };
};



export const getFilecontent = async (file: File) => {
    const extension = getFileExtension(file.name).toUpperCase();
    let text = '';
    if (extension == "DOC" || extension == 'DOCX') {
        text = await getDocFileContent(file);
    } else if (extension == "CSV") {
        text = await getCsvFileContent(file);
    } else if (extension == 'XLS' || extension == "XLSX") {
        text = await getXlsFileContent(file);
    } else if (extension == 'PDF') {
        text = await getPdfFilecontent(file);
    }

    return {
        name: file.name,
        text
    };
}

const getPdfFilecontent = async (file: File) => {
    let text = '';
    const data = new FormData()
    data.set('file', file)
    const res = await fetch('/api/train/pdf-parser', {
        method: 'POST',
        body: data
    })
    if (res.status == 200) {
        const data = await res.json();
        text = data.text
    }
    return text;
}

export const getFileExtension = (file_name: string) => {
    const fileNameParts = file_name.split('.');
    const fileExtension = fileNameParts[fileNameParts.length - 1];
    return fileExtension;
}

const getDocFileContent = async (file: File) => {
    const readAsDataURL = () => {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (e.target) {
                    var binaryString = e.target.result;
                    resolve(binaryString);
                } else {
                    reject('Error: e.target is null or undefined');
                }
            };

            reader.onabort = function (e) {
                reject('File read canceled');
            };

            reader.readAsBinaryString(file);
        });
    };

    const result = await readAsDataURL() as LoadData;
    const zip = new PizZip(result);
    const doc = new Docxtemplater().loadZip(zip);
    const text = doc.getFullText();
    return text;
}

const getCsvFileContent = async (file: File) => {
    let text = '';
    const readAsDataURL = () => {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (e.target) {
                    resolve(e.target.result);
                } else {
                    reject('Error: e.target is null or undefined');
                }
            };

            reader.onabort = function (e) {
                reject('File read canceled');
            };

            reader.readAsText(file);
        });
    };
    text = await readAsDataURL() as string;
    return text;
}

const getXlsFileContent = async (file: File) => {
    let text = '';
    const readAsDataURL = () => {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (e.target) {
                    var binaryString = e.target.result;
                    resolve(binaryString);
                } else {
                    reject('Error: e.target is null or undefined');
                }
            };

            reader.onabort = function (e) {
                reject('File read canceled');
            };

            reader.readAsBinaryString(file);
        });
    };

    const result = await readAsDataURL() as LoadData;

    let workbook = XLSX.read(result, {
        type: 'binary'
    });

    workbook.SheetNames.forEach(function (sheetName) {
        let XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        let json_object = XL_row_object;
        json_object.map((item: any) => {
            for (let key in item) {
                text += `${key}:${item[key]}`;
            }
        })
    })

    return text;
}


