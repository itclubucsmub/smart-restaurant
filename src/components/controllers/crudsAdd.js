import firestore from '../../firebase/firestore'

export default (data) => {
      // Add a new document in collection
      firestore.collection('stocklist')
        .doc()
        .set(data)
        .then(
            console.log('Added => ' , data)
      )
}