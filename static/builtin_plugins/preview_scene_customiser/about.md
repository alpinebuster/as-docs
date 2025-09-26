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
  <h2>How to use</h2>
  <ul>
    <li>Press <strong>Create New Preview Scene</strong> and create a model.</li>
    <li>To export to a file, go to <strong>File > Export > Export Preview Scene</strong>.</li>
    <li>To install directly to AS, go to <strong>File > Export > Install Preview Scene in AS</strong>, and fill in the options.</li>
  </ul>
  <h2>Managing scenes</h2>
  <p>Management options can be found under <strong>View > Preview Scene Customiser</strong>.</p>
  <ul>
    <li>To manage installed scenes, go to <strong>Manage Preview Scenes</strong>.</li>
    <li>To import scene files, go to <strong>Import Preview Scene</strong>, select a scene file, and fill in the options.</li>
    <li>To download pre-made scenes, go to <strong>Download Preview Scenes</strong>.</li>
  </ul>
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
  <a href="https://gitea.alpinebuster.top/zzz/as-plugins/">
    <i class="fa_big icon fab fa-github" style="color: #6E40C9;"></i>
    <p>Submit Preview Scenes</p>
  </a>
</div>
</div>