# Che Theia Git UI Tools plugin

Plugin for Che Theia which brings free open source desktop graphical git tools into Che workspace.

List of included tools:
 - git gui
 - gitk
 - gitg
 - git-cola
 - qgit
 - meld
 - diffuse
 - kdiff3

### Screenshots

![git-ui-tools-screen-1](https://user-images.githubusercontent.com/15607393/77170961-75295a00-6ac4-11ea-859a-3726ae0da2b3.png)

![git-ui-tools-screen-2](https://user-images.githubusercontent.com/15607393/77170968-778bb400-6ac4-11ea-9e4e-f6e6ca5ece83.png)

![git-ui-tools-screen-3](https://user-images.githubusercontent.com/15607393/77170977-79ee0e00-6ac4-11ea-9136-fd4bc7902b3f.png)

### How to install this plugin

Add the plugin definition into `components` section of your workspace devfile:

```yaml
  - type: chePlugin
    memoryLimit: 512Mi
    reference: >-
      https://raw.githubusercontent.com/mmorhun/che-theia-plugin-git-ui-tools/test/fake-registry/v3/plugins/mm4eche/git-ui-tools/1.0.0/meta.yaml
```

For small projects `256Mi` of memory usually enough.

### How to use this plugin

When Git UI Tools plugin is installed, a new panel `Git UI Tools` with git logo will appear (ususally on left side).
Open the panel and click on your favorite tool to use it (if your browser blocks the popup, please allow it).
In a moment a new tab with the selected tool for the current project will be opened.
The project to open is taked from the active file using in the editor.

To manually open any of the git tools, click on `Open desktop` and then use `Start` -> `Programming` and select needed software.

### How to install this plugin into workspace with editor different from Che Theia

In case if Che workspace has different than Che Theia editor, it is still possible to use this Che plugin.
Just add into `components` section of your devfile following definition:

```yaml
  - alias: git-ui-tools
    type: dockerimage
    image: mm4eche/che-theia-plugin-git-ui-tools
    mountSources: true
    endpoints:
      - name: desktop
        attributes:
          protocol: http
          public: 'true'
        port: 6080
    memoryLimit: 512Mi
```

To use the plugin, find external URL of `desktop` endpoint of your running workspace and open `<enpoint-url>/vnc.html` or `<enpoint-url>/vnc.html?autoconnect=1&resize=remote` to make desktop size adapted to your browser window.
Then open needed tools via `Start` -> `Programming` -> `<Needed tool>`.
