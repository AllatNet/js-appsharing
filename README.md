### Assets
Es müssen 2 JavaScript Dateien im Header abgelegt werden.
```html
<script src="../dist/appsharing.min.js"></script>
<script src="../dist/iframeResizer.min.js"></script>
```

### HTML Code
Das iFrame entsprechend platzieren. Werden mehrere verwendet, muss die ID und der Name zu einem einzigartigen geändert werden.
```html
<iframe id="__app_sharing_wireframe" name="__app_sharing_wireframe"></iframe>
```

### JavaScript
Am Ende des `</body>` Tag muss folgendes JavaScript platzieren werden.
Die Konstante `LCMS_LINK`  muss die gewünschte URL enthalten.
```html
<script>
  // Link bearbeiten
  let LCMS_LINK = 'https://www.app-sharing.com/suite/aktionreferenz/default/view?id=X&layout=X';

  // Initalisieren
  var iFrameLoader = new iFrameLoader_AppSharing(LCMS_LINK);
  iFrameResize({heightCalculationMethod: 'max'}, "#"+iFrameLoader.iframe.id);
</script>
```

### Beispiel
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Demo AppSharing Library</title>
    <script src="../dist/appsharing.min.js"></script>
    <script src="../dist/iframeResizer.min.js"></script>
</head>
<body>
<div class="cms-element-text">
  <div style="height: 600px;width:100%;background:grey;"></div>
  <p><iframe id="__app_sharing_wireframe" name="__app_sharing_wireframe"></iframe></p>
</div>
</body>
<script>
  // Link bearbeiten
  let LCMS_LINK = 'https://www.app-sharing.com/suite/aktionreferenz/default/view?id=1wj3n6ov&layout=nyowk9ov';

  // Initalisieren
  var iFrameLoader = new iFrameLoader_AppSharing(LCMS_LINK);
  iFrameResize({heightCalculationMethod: 'max'}, "#"+iFrameLoader.iframe.id);
</script>
</html>
```
