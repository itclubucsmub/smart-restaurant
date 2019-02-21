import firestore from '../../firebase/firestore'

export default (item, col) => {
  // delete a document in collection
  var flag = false
  firestore.collection(col).doc(item['.key'])
    .delete().then(
      this.flag = true
    ).catch(
      this.flag = false
    )
  return flag
}