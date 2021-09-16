function onInput(event) {
    const value = event.target.value;
    if(value) {
        console.log(value);
    }
}

function debounce(fn, wait) {
    let timeout = null;
    return function() {
        if(timeout != null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, wait);
    }
}

const debounceOnInput = debounce(onInput, 300)