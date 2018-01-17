import * as React from "react";
import * as ReactDOM from "react-dom";

import Approach1 from "./components/Approach1/Approach1";
import Approach2 from "./components/Approach2/Approach2";

import ShowButton from "./components/ShowButton/ShowButton";

import DataProvider from "./common/DataProvider";
import IDataProvider from "./common/IDataProvider";

export default class Notifier {
    public Init(): void {

        const search = window.document.location.search; // could be '?approach=1'
        const params = new URLSearchParams(search);
        const approachNumber = params.get('approach'); // 1


        var parentNode = document.getElementById('react-root');
        if (parentNode) {

            let element: any;
            switch (approachNumber) {
                case "0":
                    element = React.createElement(ShowButton, {});
                    break;
                case "1":
                    element = React.createElement(Approach1, {});
                    break;
                case "2":
                    let dataProvider1 = new DataProvider("todo_login_name");
                    element = React.createElement(Approach2, {
                        dataProvider: dataProvider1
                    });
                    break;
                default:
                    let dataProvider2 = new DataProvider("todo_login_name");
                    element = React.createElement(Approach2, {
                        dataProvider: dataProvider2
                    });
                    break;
            }
            ReactDOM.render(element, parentNode);
        }
        else {
            console.log("missing wrapper element");
        }
    }
}


document.addEventListener("DOMContentLoaded", function (event) {
    let ntf = new Notifier();
    ntf.Init();
});

