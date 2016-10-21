<?php
error_reporting(1);
include 'image.php';


if(isset($_POST['path_to_images']) && !empty($_POST['path_to_images'])){

    $main_dir = 'placeholders';
    // array_map('unlink', glob("$main_dir/*"));
    // rmdir($main_dir);
    // die;
    mkdir($main_dir);

    xcopy($_POST['path_to_images'], 'placeholders');
    $rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator('placeholders'));
    $files = array(); 
    foreach ($rii as $file) {
        if ($file->isDir()){ 
            continue;
        }

        if(is_image( $file->getPathname()) && ignoreFile($file->getFilename(), $_POST['ignore_files']) ){
            $files[] = $file->getPathname(); 
            $size = getimagesize($file->getPathname()); 
             generatePlaceholder($file->getPathname(), $size[0], $size[1] );
        }

    }
    xcopy('placeholders', $_POST['path_to_images'].'/placeholders');
    
}

?>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <title></title>
</head>
<body>

<div class="container">
<div class="col-md-12">
<div class="well">
    
    <form method="post">
        <h3>Generate placeholders</h3>
        <fieldset>
            <div class="form-group">
                <label>Path to images:</label>
                /Users/abuzer/html/4wheels-html/images2
                <input type="text" class="form-control" name="path_to_images" value="">
            </div>
            <div class="form-group">
                <label>Ignore Files:</label>
                <input type="text" class="form-control" name="ignore_files" value="logo|ajax">
            </div>
            <div class="form-group">
                <label>Ignore Extensions:</label>
                <input type="text" class="form-control" name="ignore_extensions" value="">
            </div>
           
            <input type="submit" name="Generate Placeholders">
            <p></p>
            <?php
                if( isset($_POST['path_to_images']) && empty($_POST['path_to_images'])){
                    echo '<div class="alert alert-danger">Enter path to images</div>';
                }
             ?>
        </fieldset>
    </form>
</div>
</div>
</div>

</body>
</html>
