import firestore from '../../firebase/firestore'

export default (item) => {
      // delete a document in collection
      var flag =false
      firestore.collection('stocklist').doc(item['.key'])
      .delete().then(
        console.log('Deleted'),
        this.flag=true
      ).catch(
        this.flag=false
      )
      return flag
}