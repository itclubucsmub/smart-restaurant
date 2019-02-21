import firestore from '../../firebase/firestore'

export default (key, item, col) => {
  // update a new document in collection
  firestore.collection(col)
    .doc(key)
    .update(item)
    .then()
}