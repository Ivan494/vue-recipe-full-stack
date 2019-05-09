import Api from '@/services/Api'

export default {
  refresh () {
    return Api().post('refreshRecipe')
  },
  add (recipe) {
    return Api().post('newRecipe', recipe)
  },
  delete (val) {
    return Api().post('deleteRecipe', val)
  }
}
