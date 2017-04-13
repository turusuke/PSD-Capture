const { dialog } = require('electron').remote;
const PSD = require('psd');
const fs = require('fs');
const path = require('path');

const savePng = (file, dirpath) => {
  PSD.open(file.path).then((psd) => {
    const savePath = `${dirpath}/${path.basename(file.name, path.extname(file.name))}.png`;
    psd.image.saveAsPng(savePath);
  });
};

const psdToJpeg = (files) => {

  dialog.showOpenDialog({
    properties: ['openDirectory','createDirectory']
  }, (dirpath) => {
    for (file of files) {
      savePng(file, dirpath);
    }
  });

};

document.addEventListener('dragover', (event) => {
  event.preventDefault();
}, false);

document.addEventListener('drop', (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  files instanceof FileList ? psdToJpeg(files) : '';
}, false);