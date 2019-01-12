const fixLength = 200;

document.querySelector("textarea").addEventListener("input", () => {
    const length = document.querySelector("textarea").value.length;
    const remainChar = fixLength - length;
    document.getElementById("remainChar").innerText = remainChar ;
})