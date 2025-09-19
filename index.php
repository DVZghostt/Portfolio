<?php

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio - Accueil</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="style.css" rel="stylesheet">
</head>
<body>

<!-- Menu -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow">
    <div class="container">
        <a class="navbar-brand fw-bold" href="#">Accueil</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="menu">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item"><a class="nav-link" href="index.php">Acceuil</a></li>
                <li class="nav-item"><a class="nav-link" href="moi.php">À propos de moi</a></li>
                <li class="nav-item"><a class="nav-link" href="stages.php">Mes stages</a></li>
                <li class="nav-item"><a class="nav-link" href="pro.php">Parcours pro</a></li>
            </ul>
        </div>
    </div>
</nav>

<section class="py-5 bg-transparent">
    <div class="container">
        <div class="row g-4">
            <div class="col-md-4">
            </div>
            <div class="col-md-4">
                <div class="info-box p-4 shadow rounded">
                    <h3>À propos de moi</h3>
                        <p>Étudiant dynamique, sociable et motivé, je me distingue par ma capacité à...</p>
                        <a href="moi.php" class=" text-decoration-none">En savoir plus</a>
                </div>
            </div>
            <div class="col-md-4">
            </div>
            <div class="col-md-4">
            </div>
            <div class="col-md-4">
                <div class="info-box p-4 shadow rounded">
                    <h3>Mes stages</h3>
                    <p>Expérience en entreprise avec implication dans des missions...</p>
                    <a href="stages.php" class=" text-decoration-none">En savoir plus</a>
                </div>
            </div>
            <div class="col-md-4">
            </div>
            <div class="col-md-4">
            </div>
            <div class="col-md-4">
                <div class="info-box p-4 shadow rounded">
                    <h3>Parcours pro</h3>
                    <p>Plusieurs projets réalisés, allant de la conception de sit web à la gestion de bases de données...</p>
                    <a href="pro.php" class=" text-decoration-none">En savoir plus</a>
                </div>
            </div>
        </div>
    </div>
</section>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>