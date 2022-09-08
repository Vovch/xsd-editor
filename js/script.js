import Navbar from "./src/components/Navbar.js";
import Explorer from "./src/components/Explorer.js";
import Editor from "./src/components/Editor.js";
import Status from "./src/components/Status.js";
import GraphicEditor from "./src/components/GraphicEditor.js";
import {testText} from "./testText.js";
import "./src/components/XsdList.js"

var app = new Vue({
  el: "#app",

  data() {
    return {
      connected: false,
      files: [{ name: "test.xml", content: testText }],
      active: 0,
      mode: "xml",
      mirror: false,
      cursor: { ch: 0, line: 0 },
      theme: "material-ocean",
      refresh: false,
      isGraphic: false,
    };
  },

  template: `
    <div>
        <div v-if="!isGraphic">
          <Navbar :mirror="mirror" @toggle="mirror = !mirror" :connected="connected" @setGraphic="isGraphic = true"/>
          <div class="d-flex">
              <Explorer :files="files" @addFile="addFile" @removeFile="removeFile" @openFile="openFile" :active="active"/>
              <Editor :files="files" @openFile="openFile" :active="active" @edit="edit" :mode="mode" @cursor="setCursor" :refresh="refresh" :theme="theme"/>
          </div>
          <Status :mode="mode" :active="active" :files="files" :cursor="cursor" @setFont="setFont" @setTheme="setTheme"/>
        </div>
        <div v-if="isGraphic">
            <GraphicEditor :active="active" :files="files" @setGraphic="isGraphic = false"/>
        </div>
    </div>
  `,
  created() {},

  mounted() {
    this.setMode();
  },

  methods: {
    addFile({ name, content }) {
      this.files = [...this.files, { name: name, content: content }];
    },

    removeFile(payload) {
      this.files.splice(payload, 1);
    },

    openFile(payload) {
      this.active = payload;
      this.setMode();
    },

    edit(payload) {
      this.files[this.active].content = payload;
    },

    setMode() {
      let filename = this.files[this.active].name;
      if (filename.includes(".")) {
        filename = this.files[this.active].name.split(".");
        if (filename.length >= 2) {
          let ext = filename.pop();

          switch (ext) {
            case "c":
            case "cpp":
            case "java":
              this.mode = "text/x-c++src";
              break;

            case "py":
              this.mode = "python";
              break;

            case "md":
              this.mode = "markdown";
              break;

            case "sql":
              this.mode = "sql";
              break;

            case "sh":
              this.mode = "shell";
              break;

            case "jsx":
              this.mode = "jsx";
              break;

            case "html":
            case "htm":
              this.mode = "htmlmixed";
              break;

            case "xml":
            case "xsd":
              this.mode = "xml";
              break;

            case "js":
            case "json":
              this.mode = "javascript";
              break;

            case "php":
              this.mode = "php";
              break;

            default:
              this.mode = "";
              break;
          }
        }
      }
    },

    setCursor(payload) {
      this.cursor = { ...payload };
    },

    setFont() {
      this.refresh = !this.refresh;
    },

    setTheme(payload) {
      this.theme = payload;
    },
  },

  components: {
    Navbar,
    Explorer,
    Editor,
    Status,
    GraphicEditor,
  },
});
