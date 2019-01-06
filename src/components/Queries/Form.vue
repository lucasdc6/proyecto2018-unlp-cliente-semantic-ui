<template>
  <div>
    <div class="form">
      <h3 v-if="message">{{message}}</h3>
      <h3 v-if="errors.length > 0">Errores</h3>
      <div v-for="(error, index) in errors" :key="index">
        <p>{{error}}</p>
      </div>
      <h3>Nueva consulta</h3>
      <div class="field">
        <sui-input v-model="query.firstName" placeholder="Nombre"/>
        <sui-input v-model="query.lastName" placeholder="Apellido"/>
      </div>
      <div class="field">
        <sui-input v-model="query.email" placeholder="Correo"/>
        <sui-input v-model="query.description" placeholder="Descripción"/>
      </div>
      <div class="field">
        <sui-dropdown
          placeholder="Seleccione una categoría"
          fluid
          selection
          v-model="query.category"
          :options="categories"
        />
      </div>
      <div class="field">
        <sui-button primary v-on:click="handleSubmit">Guardar</sui-button>
        <sui-button secondary v-on:click="handleClear">Limpiar</sui-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewQuery',
  props: ['form'],
  data() {
    return {
      query: {
        firstName: '',
        lastName: '',
        email: '',
        description: '',
        category: '',
        state: '',
      },
      categories: [],
      message: '',
      errors: [],
    };
  },
  mounted() {
    if (this.form === 'edit') {
      this.fetchQuery();
    }
    fetch('https://virtserver.swaggerhub.com/lucasdc6/Proyecto2018/1.0.0/categorias')
      .then(response => response.json())
      .then((json) => {
        this.categories = json.map(elem => ({ text: elem.name, value: elem.id }));
      })
      .catch(() => {
        this.errors = [];
        this.errors.push('Ocurrió un error cargando los datos. Vuelva a intentarlo más tarde');
      });
  },
  methods: {
    fetchQuery() {
      fetch(`https://virtserver.swaggerhub.com/lucasdc6/Proyecto2018/1.0.0/consultas/${this.$route.params.id}`)
        .then(response => response.json())
        .then((json) => {
          this.query = json;
          this.query.category = json.category.id;
          this.query.state = json.state.id;
        })
        .catch(() => {
          this.errors = [];
          this.errors.push('ERROR');
        });
    },
    checkFields() {
      this.errors = [];
      if (!this.query.firstName) {
        this.errors.push('El campo Nombre es requerido');
      }
      if (!this.query.lastName) {
        this.errors.push('El campo Apellido es requerido');
      }
      if (!this.query.email) {
        this.errors.push('El campo Correo es requerido');
      }
      if (!this.query.description) {
        this.errors.push('El campo Descripción es requerido');
      }
      if (!this.query.category) {
        this.errors.push('El campo Categoría es requerido');
      }
      return (this.errors.length <= 0);
    },
    handleSubmit() {
      if (!this.checkFields()) {
        return;
      }
      let url;
      let method;
      if (this.form === 'new') {
        url = 'https://virtserver.swaggerhub.com/lucasdc6/Proyecto2018/1.0.0/consultas';
        method = 'POST';
      } else {
        url = `https://virtserver.swaggerhub.com/lucasdc6/Proyecto2018/1.0.0/consultas/${this.$route.params.id}`;
        method = 'PUT';
      }

      fetch(url, {
        method,
        body: JSON.stringify(this.query),
      })
        .then(() => {
          this.message = 'Se creó una nueva consulta.';
        })
        .catch(() => {
          this.message = 'Ocurrió un error al crear la nueva consulta.';
        });
    },
    handleClear() {
      this.query = {
        firstName: '',
        lastName: '',
        email: '',
        description: '',
        category: '',
      };
    },
  },
};
</script>
