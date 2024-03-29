<?php


function xcopy($source, $dest, $permissions = 0755)
{
    // Check for symlinks
    if (is_link($source)) {
        return symlink(readlink($source), $dest);
    }

    // Simple copy for a file
    if (is_file($source)) {
        return copy($source, $dest);
    }

    // Make destination directory
    if (!is_dir($dest)) {
        mkdir($dest, $permissions);
    }

    // Loop through the folder
    $dir = dir($source);
    while (false !== $entry = $dir->read()) {
        // Skip pointers
        if ($entry == '.' || $entry == '..') {
            continue;
        }

        // Deep copy directories
        xcopy("$source/$entry", "$dest/$entry", $permissions);
    }

    // Clean up
    $dir->close();
    return true;
}



function is_image($path)
{
    $a = getimagesize($path);
    $image_type = $a[2];
     
    if(in_array($image_type , array(IMAGETYPE_GIF , IMAGETYPE_JPEG ,IMAGETYPE_PNG , IMAGETYPE_BMP)))
    {
        return true;
    }
    return false;
}

function ignoreFile($filename){
    return !(preg_match('/logo|ajax/i', $filename));
}

function html2rgb($strColor) {
			if (strlen($strColor) == 6) {
				list($strRed, $strGreen, $strBlue) = array($strColor[0].$strColor[1], $strColor[2].$strColor[3], $strColor[4].$strColor[5]);
			} elseif (strlen($strColor) == 3) {
				list($strRed, $strGreen, $strBlue) = array($strColor[0].$strColor[0], $strColor[1].$strColor[1], $strColor[2].$strColor[2]);
			}

			$strRed   = hexdec($strRed);
			$strGreen = hexdec($strGreen);
			$strBlue  = hexdec($strBlue);

			return array($strRed, $strGreen, $strBlue);
		}
function generatePlaceholder($file, $height, $width){

	$strType = pathinfo($file, PATHINFO_EXTENSION);
	$strSize  = (($strSize = $_GET['size'])   ? strtolower($strSize)  : $height."x".$width);
///	$strType  = (($strType = $_GET['type'])   ? strtolower($strType)  : 'png');
	$strBg    = (($strBg = $_GET['bg'])       ? strtolower($strBg)    : 'cacaca');
	$strColor = (($strColor = $_GET['color']) ? strtolower($strColor) : '000000');

	// Now let's check the parameters.
	if ($strSize == NULL) {
		die('<b>You have to provide the size of the image.</b> Example: 250x320.</b>');
	}
	if ($strType != 'png' and $strType != 'gif' and $strType != 'jpg') {
		die('<b>The selected type is wrong. You can chose between PNG, GIF or JPG.');
	}
	if (strlen($strBg) != 6 and strlen($strBg) != 3) {
		die('<b>You have to provide the background color as hex.</b> Example: 000000 (for black).');
	}
	if (strlen($strColor) != 6 and strlen($strColor) != 3) {
		die('<b>You have to provide the font color as hex.</b> Example: ffffff (for white).');
	}

	// Get width and height from current size.
	list($strWidth, $strHeight) = split('x', $strSize);
	// If no height is given, we'll return a squared picture.
	if ($strHeight == NULL) $strHeight = $strWidth;

	// Check if size and height are digits, otherwise stop the script.
	if (ctype_digit($strWidth) and ctype_digit($strHeight)) {
		// Check if the image dimensions are over 9999 pixel.
		if (($strWidth > 9999) or ($strHeight > 9999)) {
			die('<b>The maximum picture size can be 9999x9999px.</b>');
		}

		// Let's define the font (size. And NEVER go above 9).
		$intFontSize = $strWidth / 12;
		if ($intFontSize < 9) $intFontSize = 9;

		$strFont = "DroidSansMono.ttf";
		$strText = $strWidth . 'x' . $strHeight;
		

		if($strWidth < 40 || $strHeight<40){
			$strText = '';
		}
		// Create the picture.
		$objImg = @imagecreatetruecolor($strWidth, $strHeight) or die('Sorry, there is a problem with the GD lib.');

		// Color stuff.
		

		$strBgRgb    = html2rgb($strBg);
		$strColorRgb = html2rgb($strColor);
		$strBg       = imagecolorallocate($objImg, $strBgRgb[0], $strBgRgb[1], $strBgRgb[2]);
		$strColor    = imagecolorallocate($objImg, $strColorRgb[0], $strColorRgb[1], $strColorRgb[2]);

		// Create the actual image.
		imagefilledrectangle($objImg, 0, 0, $strWidth, $strHeight, $strBg);

		// Insert the text.
		$arrTextBox    = imagettfbbox($intFontSize, 0, $strFont, $strText);
		$strTextWidth  = $arrTextBox[4] - $arrTextBox[1];
		$strTextHeight = abs($arrTextBox[7]) + abs($arrTextBox[1]);
		$strTextX      = ($strWidth - $strTextWidth) / 2;
		$strTextY      = ($strHeight - $strTextHeight) / 2 + $strTextHeight;
		imagettftext($objImg, $intFontSize, 0, $strTextX, $strTextY, $strColor, $strFont, $strText);

		// Give out the requested type.
		switch ($strType) {
			case 'png':
				//header('Content-Type: image/png');
				imagepng($objImg, $file);
				break;
			case 'gif':
				//header('Content-Type: image/gif');
				imagegif($objImg, $file, 100);
				break;
			case 'jpg':
				//header('Content-Type: image/jpeg');
				imagejpeg($objImg, $file, 100);
				break;
		}

		// Free some memory.
		imagedestroy($objImg);
	} else {
		die('<b>You have to provide the size of the image.</b> Example: 250x320.</b>');
	}
}