Vue.component('XsdList', {
    props: ['parsed'],
    name: 'XsdList',

    data() {
        return {
        };
    },
    template: `
        <span v-if="parsed instanceof Object">
            <ul v-for="(value, key) in _.omit(parsed, '$originalXmlNode')">
                <li v-if="value instanceof Object">{{value.name || key}}</li>
                <li v-if="value instanceof Object" style="list-style: none;">
                    <XsdList  :parsed="value" />
                </li>
                <li v-else>{{key}}: {{value}}</li>
            </ul>
        </span>
        <span v-else>{{parsed}}</span>
      `,
    created() {
        console.log(this.parsed)
    },
    methods: {},
});
