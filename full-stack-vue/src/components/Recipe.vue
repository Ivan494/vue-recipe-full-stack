<template>
  <div>
    <div role="tablist">
      <b-card v-bind:key="key" v-for="(recipe,key) in recipes">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block href="#" v-b-toggle="'accordion-'+key" variant="info">{{recipe.title}}</b-button>
        </b-card-header>
        <b-collapse :id="'accordion-'+key" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <ul>
              <li v-bind:key="key" v-for="(ingredient,key) in recipe.ingredients">
                {{ingredient}}
              </li>
            </ul>
            <b-button v-on:click="deleteRecipe(recipe.id)"> Delete </b-button>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <b-button v-b-modal.modal-1>Add Recipe</b-button>
    <b-modal v-on:ok="addRecipe" id="modal-1" title="Add Recipe">
      <div>
        <b-form-input v-model="modalForm.recipeName" placeholder="Recipe Name"></b-form-input>
        <br>
        <b-form-input v-model="modalForm.recipeList" placeholder="Enter Ingredients,Separated,By Commas"></b-form-input>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Recipe from '@/services/RecipeList'
export default {
  data () {
    return {
      recipes: [
        /*         {
          title: "Pumpkin Pie",
          ingredients: [
            "Pumpkin Puree",
            "Sweetened Condensed Milk",
            "Eggs",
            "Pumpkin Pie Spice",
            "Pie Crust"
          ]
        },
        {
          title: "Spaghetti",
          ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"]
        } */
      ],
      modalForm: {
        recipeName: '',
        recipeList: ''
      }
    }
  },
  methods: {
    addRecipe: async function () {
      try {
        var ingredients = this.modalForm.recipeList.split(',')
        await Recipe.add({
          title: this.modalForm.recipeName,
          ingredients: ingredients
        })
        this.refreshRecipe()
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    deleteRecipe: async function (val) {
      try {
        await Recipe.delete({id: val})
        this.refreshRecipe()
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    refreshRecipe: async function () {
      try {
        var res = await Recipe.refresh()
        this.recipes = []
        res.data.forEach(recipe => {
          var id = recipe.id
          var title = recipe.title
          var ingredients = recipe.ingredients.split(',')
          this.recipes.push({ id: id, title: title, ingredients: ingredients })
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    openModal: function () {
      this.showModal = true
    }
  },
  created: function () {
    this.refreshRecipe()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>
