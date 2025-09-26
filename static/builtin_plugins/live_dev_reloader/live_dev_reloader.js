let actions, watching, message, styles, unwatchAction, rewatchAction
const id = "live_dev_reloader"
const name = "Live Dev Reloader"
const icon = "refresh"
ASPlugin.register(id, {
  title: name,
  icon: "icon.png",
  author: "alpinebuster",
  description: "Edit plugins and themes live in any text editor and have them automatically update in AS.",
  tags: ["Plugins", "Themes", "AS"],
  version: "1.0.2",
  min_version: "1.5.2",
  new_repository_format: true,
  variant: "desktop",
  website: "https://alpinebuster.top/plugins/live-dev-reloader/",
  repository: "https://github.com/alpinebuster/as-plugins/tree/main/live_dev_reloader",
  bug_tracker: "https://github.com/alpinebuster/as-plugins/issues?title=[Live Dev Reloader]",
  creation_date: "2025-01-20",
  has_changelog: true,
  onload() {
    let toggle
    actions = [
      new Action("live_dev_reloader_watch", {
        plugin: id,
        name: "Watch Plugin Or Theme File",
        icon: "visibility",
        description: "Watch a plugin or theme file and reload it in AS when changes are made",
        condition: () => !watching,
        click() {
          AS.import({
            extensions: ["js", "astheme", "css"],
            type: "Plugin or Theme",
          }, files => watch(files[0].path))
        }
      }),
      toggle = new Toggle("live_dev_reloader_persist", {
        name: "Persist After Restart",
        description: "The file should continue being watched after a AS restart",
        icon,
        onChange(state) {
          localStorage.setItem("live_dev_reloader_persist", state)
        }
      })
    ]
    setTimeout(() => {
      const file = localStorage.getItem("live_dev_reloader_file")
      if (localStorage.getItem("live_dev_reloader_file") && localStorage.getItem("live_dev_reloader_persist") === "true") {
        toggle.set(true)
        if (localStorage.getItem("live_dev_reloader_stopped") === "true") rewatch()
        else watch(file, true)
      } else if (localStorage.getItem("live_dev_reloader_stopped") === "true") rewatch()
    }, 0)
    MenuBar.addAction({
      name,
      id,
      children: actions,
      icon,
    }, "help.developer.1")
  },
  onunload() {
    actions.forEach(e => e.delete())
    unwatch("reload")
    MenuBar.removeAction(`help.developer.${id}`)
  }
})

function watch(file, first) {
  if (!fs.existsSync(file)) {
    localStorage.removeItem("live_dev_reloader_file")
    unwatch("force")
    return AS.showQuickMessage(`Stopped watching. File not found: ${PathModule.basename(file)}`, 3000)
  }
  fs.watchFile(file, { interval: 100 }, (...args) => update(...args, true))
  fs.watchFile(PathModule.join(PathModule.dirname(file), "about.md"), { interval: 100 }, update)
  watching = file
  update({ mtime: 1 }, { mtime: 0 }, true, true)
  localStorage.setItem("live_dev_reloader_file", file)
  AS.showQuickMessage(`Watching file: ${PathModule.basename(file)}`, 3000)
  if (unwatchAction) {
    unwatchAction.delete()
    actions.splice(actions.indexOf(unwatchAction), 1)
  }
  unwatchAction = new Action("live_dev_reloader_unwatch", {
    plugin: id,
    name: "Stop watching plugin or theme file",
    icon: "visibility_off",
    description: `Currently watching: ${file}`,
    condition: () => watching,
    click: () => unwatch("manual")
  })
  actions.unshift(unwatchAction)
  localStorage.setItem("live_dev_reloader_stopped", false)
}

function unwatch(type) {
  if (watching) {
    fs.unwatchFile(watching)
    fs.unwatchFile(PathModule.join(PathModule.dirname(watching), "about.md"))
  }
  styles?.delete()
  message?.close()
  if (type === "force") localStorage.removeItem("live_dev_reloader_file")
  else if (type === "manual") {
    localStorage.setItem("live_dev_reloader_stopped", true)
    rewatch()
    AS.showQuickMessage(`Stopped watching ${PathModule.basename(watching)}`, 3000)
  } else if (type === "reload") {
    if (watching && localStorage.getItem("live_dev_reloader_persist") === "true") localStorage.setItem("live_dev_reloader_stopped", false)
    else localStorage.setItem("live_dev_reloader_stopped", true)
  }
  watching = false
}

function rewatch() {
  if (rewatchAction) {
    rewatchAction.delete()
    actions.splice(actions.indexOf(rewatchAction), 1)
  }
  const file = localStorage.getItem("live_dev_reloader_file")
  if (fs.existsSync(file)) {
    rewatchAction = new Action("live_dev_reloader_rewatch", {
      plugin: id,
      name: `Rewatch ${PathModule.basename(file)}`,
      description: `Rewatch the file: ${file}`,
      icon,
      condition: () => !watching && localStorage.getItem("live_dev_reloader_stopped") === "true" && localStorage.getItem("live_dev_reloader_file"),
      click: () => watch(file)
    })
    actions.push(rewatchAction)
  }
}

async function update(curr, prev, main, first) {
  if (main && curr.mtimeMs === 0) {
    AS.showQuickMessage(`Stopped watching. File not found: ${PathModule.basename(watching)}`, 3000)
    return unwatch("force")
  } else if (curr.mtime > prev.mtime) {
    message?.close()
    styles?.delete()
    if (watching.endsWith(".js")) {
      const id = PathModule.basename(watching, ".js")
      const plugin = Plugins.all.find(e => e.id === id && e.source === "file")
      if (!plugin) return message = AS.showMessageBox({
        title: "Plugin not installed",
        message: `Please install the <code>${id}</code> plugin so that it can be watched for live changes.\n\nPlugin location: <code>${watching}</code>`,
        buttons: ["Install Plugin", "Stop Watching", "dialog.close"]
      }, button => {
        if (button === 0) AS.read(watching, {}, f => new Plugin().loadFromFile(f[0], true))
        else if (button === 1) unwatch("force")
      })
      if (first) return
      plugin.reload()
      console.log(`Plugin reloaded: ${id}`)
    } else {
      let css = fs.readFileSync(watching)
      let name
      if (watching.endsWith(".astheme")) {
        try {
          const data = JSON.parse(css)
          name = data.name
          css = `body{`
          if (data.main_font) css += `--font-custom-main: ${data.main_font};`
          if (data.headline_font) css += `--font-custom-headline: ${data.headline_font};`
          if (data.code_font) css += `--font-custom-code: ${data.code_font};`
          if (data.colors) for (const [id, col] of Object.entries(data.colors)) {
            css += `--color-${id}: ${col} !important;`
          }
          css += "}"
          if (data.borders) {
            const borders = (await fetch("css/general.css").then(e => e.text()).catch(() => "")).match(/(?<=\/\* Theme Borders \*\/)(?:.|\r\n|\r)*?(?=\/\*|$)/)
            if (borders) css += borders[0].replace(/([\n\r\t]|\.theme_borders)/g, "")
            css += "body #plugin_list > li {border: 1px solid var(--color-border);margin: 0;"
          }
          css += data.css ?? ""
        } catch (err) {
          return message = AS.showMessageBox({
            title: "Invalid JSON",
            message: `Invalid JSON in theme <code>${PathModule.basename(watching)}</code>:\n<code>${err.message}</code>\n\nTheme location: <code>${watching}</code>`,
            buttons: ["Stop Watching", "dialog.close"]
          }, button => {
            if (button === 0) unwatch("force")
          })
        }
      }
      styles = AS.addCSS(css)
      resizeWindow()
      console.log(`Theme reloaded: ${name ?? PathModule.basename(watching).split(".").slice(0, -1).join(".")}`)
    }
  }
}