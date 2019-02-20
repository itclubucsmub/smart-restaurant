import firestore from '../../firebase/firestore'

export default (key, item) => {
      // update a new document in collection
      firestore.collection('stocklist')
        .doc(key)
        .update(item)
        .then(
            console.log("updated =>", item)
        )
}