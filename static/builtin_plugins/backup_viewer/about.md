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
  <p>This plugin adds a a backup tab to the start screen that allows you to quickly and easily see your project backups.</p>
  <h2>Usage</h2>
  <p>On the <b>Recent Models</b> view on the start screen, a new <b>Backup</b> tab will be added. Select this tab to view your backups. Both grid view and list view are available</p>
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