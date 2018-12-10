import * as firebase from "../firebase";

// Upload File to Firebase
const uploadFileToFirebase = file => firebase.upload(file.rawFile);

// Add Upload Feature
const addUploadFeature = requestHandler => (type, resource, params) => {
  console.log(
    "<UploadFeature> requestHandler: type=%o, resource=%o, params=%o",
    type,
    resource,
    params
  );

  /* check */
  if (type === "CREATE" && resource === "posts") {
    const newPictures = [params.data.pictures];
    console.log(
      "<UploadFeature> requestHandler: CREATE, newPictures=%o",
      newPictures
    );

    /* done */
    return Promise.all(newPictures.map(uploadFileToFirebase))
      .then(fileURLs =>
        fileURLs.map(fileURL => ({
          src: fileURL,
          title: `${params.data.title}`
        }))
      )
      .then(transformedNewPictures =>
        requestHandler(type, resource, {
          ...params,
          data: {
            ...params.data,
            pictures: [...transformedNewPictures]
          }
        })
      );
  }
  if (type === "CREATE" && resource === "events") {
    const newPoster = params.data.poster;
    console.log(
      "<UploadFeature> requestHandler: CREATE, newPoster=%o",
      newPoster
    );

    /* done */
    return uploadFileToFirebase(newPoster).then(fileURL =>
      requestHandler(type, resource, {
        ...params,
        data: {
          ...params.data,
          poster: fileURL
        }
      })
    );
  }
  if (type === "UPDATE" && resource === "events") {
    const poster = params.data.poster;
    console.log("<UploadFeature> requestHandler: UPDATE, poster=%o", poster);

    /* done */
    if (poster.rawFile)
      return uploadFileToFirebase(poster).then(fileURL =>
        requestHandler(type, resource, {
          ...params,
          data: {
            ...params.data,
            poster: fileURL
          }
        })
      );
  }

  /* done */
  return requestHandler(type, resource, params);
};

export default addUploadFeature;
