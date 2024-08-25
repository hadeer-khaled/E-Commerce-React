const handleDownloadEachImage = (images, index) => {
  const url = images[index].url;
  const filename = images[index].original_filename;

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default handleDownloadEachImage;
