<?= $this->assets->outputCss() ?> <?= $this->assets->outputJs() ?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Random Login Form</title>
</head>

<body>


    <div class="body"></div>
    <div class="grad"></div>
    <div class="header">
        <div>Ez<span>Zigbee</span></div>
    </div>
    <br>
    <form action="../index/login" method="post">
        <div class="login">
            <input type="text" placeholder="Username"  name="username" value= "<?= $rememberme ?>" pattern="<?= $namecondition ?>" required><br>
            <input type="password" placeholder="Password" name="password" pattern="<?= $namecondition ?>" required><br>
            <button type="submit" name="submit" value="Login">Login</button> <br>
            <input type="checkbox" name ="checkbox"  checked value="check" ><span class="remember"> Remember me </span>
        </div>
    </form>
</body>

</html>