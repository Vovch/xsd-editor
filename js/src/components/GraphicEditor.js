export default {
    props: ['files', 'active'],

    data() {
        return {
            file: null,
            parsed: null,
            elementTypes: null,
        };
    },
    template: `
        <section class="d-flex" style="height: 100vh; overflow: scroll">
            <div class="d-flex flex-column" style="width: 70vw;">
                <button class="btn btn-primary" @click="$emit('setGraphic')">View Text</button>
                <div style="word-break: break-all;">
                    <XsdList :parsed="parsed" />
                </div>
            </div>
            <div style="user-select: none;width: 30vw; flex-shrink: 0; flex-grow: 0; border-left: 1px solid black">
                <div v-for="(value, key) in elementTypes">
                    <span>{{key}}</span>
                    <ul>
                        <li v-for="(value, key) in value">{{value.name}}</li>   
                    </ul>
                </div>
            </div>
        </section>
      `,

    methods: {
        updateFiles() {
            try {
                this.file = this.files[this.active];
                this.parsed = $.xml2json(this.file.content);
                this.elementTypes = _.pick(this.parsed, ['simpleType', 'complexType', 'element'])
                console.dir(this.parsed);
            } catch (e) {
                console.log(e);
            }
        }
    },
    mounted() {
        this.updateFiles();
    },
    watch: {
        active() {
            this.updateFiles();
        },
        files() {
            this.updateFiles();
        }
    }
};
