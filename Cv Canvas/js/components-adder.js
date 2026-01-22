function component_adder(id, content){
    let component = document.getElementById(id);

    fetch(content)
        .then(response => response.text())
        .then(data => component.innerHTML = data)
}

component_adder('header', '/Cv Canvas/components/header.html');
component_adder('footer', '/Cv Canvas/components/footer.html');