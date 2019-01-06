<template>
  <div class='centered'>
    <h1>Consultas</h1>
    <h3 v-if="message">{{message}}</h3>
    <h4 v-if="isFetching && !error">Cargando datos</h4>
    <div v-else>
      <h3>Tienes {{consultas.length}} consultas</h3>
      <a class='options' href="#/consultas/new">Agregar</a>
      <sui-table celled padded>
        <sui-table-header>
          <sui-table-row>
            <sui-table-header-cell>#</sui-table-header-cell>
            <sui-table-header-cell>Nombre</sui-table-header-cell>
            <sui-table-header-cell>Apellido</sui-table-header-cell>
            <sui-table-header-cell>Descripción</sui-table-header-cell>
            <sui-table-header-cell>Categoría</sui-table-header-cell>
            <sui-table-header-cell>Estado</sui-table-header-cell>
            <sui-table-header-cell></sui-table-header-cell>
          </sui-table-row>
        </sui-table-header>
        <sui-table-body>
          <sui-table-row v-for="consulta in consultas" :key="consulta.id">
            <sui-table-cell>{{consulta.id}}</sui-table-cell>
            <sui-table-cell>{{consulta.firstName}}</sui-table-cell>
            <sui-table-cell>{{consulta.lastName}}</sui-table-cell>
            <sui-table-cell>{{consulta.description}}</sui-table-cell>
            <sui-table-cell>{{consulta.category.name}}</sui-table-cell>
            <sui-table-cell>{{consulta.state.name}}</sui-table-cell>
            <sui-table-cell>
              <a class='link' :href="`#/consultas/${consulta.id}/edit`">Editar</a>
              <a class='link' @click="deleteQuery(consulta.id)">Eliminar</a>
            </sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
      <h2 v-if="error">{{error}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QueryList',
  data() {
    return {
      message: '',
      error: '',
      isFetching: true,
      consultas: [],
    };
  },
  mounted() {
    fetch('https://virtserver.swaggerhub.com/lucasdc6/Proyecto2018/1.0.0/consultas')
      .then(response => response.json())
      .then((json) => {
        this.consultas = json;
        this.isFetching = false;
      })
      .catch(() => {
        this.error = 'Ocurrió un error cargando los datos. Vuelva a intentarlo más tarde';
      });
  },
  methods: {
    deleteQuery(id) {
      fetch(`https://virtserver.swaggerhub.com/lucasdc6/Proyecto2018/1.0.0/consultas/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          this.message = 'La consulta se eliminó correctamente';
        })
        .catch(() => {
          this.error = 'Ocurrió un error eliminando la consulta. Vuelva a intentarlo más tarde';
        });
    },
  },
};
</script>
