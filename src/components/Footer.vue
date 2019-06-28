<template>
  <div class="container-fluid bg-dark text-center" style="color: white;" id="pieddepage">
    <footer class="row">
      <!-- Réseaux sociaux -->
      <div class="col-xs-12 mx-auto">
        <ul class="socialmedia list-inline list-unlisted">
          <li class="list-inline-item">
            <a href="#">
              <i class="fab fa-twitter fa-2x"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a href="#">
              <i class="fab fa-facebook-f fa-2x"></i>
            </a>
          </li>
          <li class="list-inline-item">
            <a href="#">
              <i class="fab fa-google-plus-g fa-2x"></i>
            </a>
          </li>
        </ul>
      </div>
      <!-- pied de page du footer-->
      <div class="col-12" style="margin-bottom: 20px;">
        <p>
          <a href="#">Mentions légales</a> |
          <a href="#">Politique de confidentialité</a>
        </p>
        <p>MadeInFck | Projet 7 OC | Juillet 2019</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
#pieddepage {
  padding-top: 20px;
  padding-bottom: 10px;
}

.socialmedia {
  display: block;
}

i {
  color: #fff;
  margin-left: 10px;
}

a {
  color: rgb(118, 149, 235);
}

a:hover,
i:hover {
  color: white;
  text-decoration: none !important;
}
</style>
