<div id="about-page">
<style>
  #about-page {
    display: flex;
		flex-direction: column;
    flex-grow: 1;
  }
  #about-content {
    display: flex;
		flex-direction: column;
    flex-grow: 1;
  }
  #about-markdown-links {
    display: flex;
    justify-content: space-around;
    margin: 20px 20px 0;
  }
  #about-markdown-links > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 5px;
    text-decoration: none;
    flex-grow: 1;
    flex-basis: 0;
    color: var(--color-subtle_text);
    text-align: center;
  }
  #about-markdown-links > a:hover {
    background-color: var(--color-accent);
    color: var(--color-accent_text);
    border-radius: 4px;
  }
  #about-markdown-links > a > i {
    font-size: 32px;
    width: 100%;
    max-width: initial;
    height: 32px;
    text-align: center;
  }
  #about-markdown-links > a:hover > i {
    color: var(--color-accent_text) !important;
  }
  #about-markdown-links > a > p {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0;
  }
</style>


<div id="about-content">
  <p>This plugin adds a way to edit both plugin and theme files in a text editor of your choice, and have them automatically update inside AS upon you saving the file.</p>
  <p>When a plugin file is being watched for changes, it's <strong>about.md</strong> file will be automatically watched for changes too.</p>
  <p>Theme files support both <strong>.astheme</strong> and <strong>.css</strong> files being watched.</p>
  <h2>How to use</h2>
  <h3>Watching files</h3>
  <p>To watch a file, have a theme or plugin file ready, then go to <strong>Help > Developer > Live Dev Reloader</strong>. From here, select <strong>Watch Plugin Or Theme File</strong>, then select your plugin or theme file.</p>
  <h3>Unwatching files</h3>
  <p>To stop watching a file, go to <strong>Help > Developer > Live Dev Reloader</strong> and select <strong>Stop watching plugin or theme file</strong>.</p>
  <h3>Persistent mode</h3>
  <p>To have a plugin or theme continue to be watched next time AS is loaded, enable persistent mode. This can be found at <strong>Help > Developer > Live Dev Reloader > Persist After Restart</strong>.</p>
</div>
<div id="about-markdown-links">
  <a href="https://alpinebuster.top/">
    <i class="material-icons icon" style="color: #33E38E;">language</i>
    <p>By alpinebuster</p>
  </a>
  <a href="https://chat.alpinebuster.top/">
    <i class="fa_big icon fas fa-comment-dots" style="color: #727FFF;"></i>
    <p>Chat Server</p>
  </a>
</div>
</div>