import firestore from '../../firebase/firestore'

export default (data, col) => {
      // Add a new document in collection
      firestore.collection(col)
        .doc()
        .set(data)
        .then(
      )
}