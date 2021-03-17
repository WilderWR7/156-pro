const btn = document.querySelector("#calcular");
const vc = document.querySelector("#vc");
const r = document.querySelector("#r");
const c = document.querySelector("#c");
const t = document.querySelector("#t");
const datos = document.querySelector(".datos");
addEventListener("DOMContentLoaded", ()=>{
    //console.log(calcular);
    btn.addEventListener("click", calcular);
    vc.addEventListener("blur", validar);
    r.addEventListener("blur", validar);
    c.addEventListener("blur", validar);
    t.addEventListener("blur", validar);
    
    function validar(e){
        const valor = e.target.value;
        const paren = e.target.parentElement;
        // console.log(paren);
        // const p = document.createElement("p");
        // p.textContent = "Introduzca un numero";
        // p.classList.add("mensaje_error");
        if(parseFloat(valor) && parseFloat(valor) >= 0){
            e.target.classList.remove("error");
            e.target.classList.add("correcto");
        }
        else{
            e.target.classList.remove("correcto");
            e.target.classList.add("error");
        }        
    }

    function calcular(e){
        e.preventDefault();
        const section = document.createElement("div");
        //section.classList.add("resultado");
        const rdo = document.querySelector(".resultado"); 
        
        //if(rdo.firstChild.type !== null){
            while(rdo.lastChild){
                rdo.removeChild(rdo.lastChild);
            }
        //}

        section.innerHTML=`
        <p>Datos:</p>
        <div class="resultado_datos">
            <div class="resultado_datos_v">
            </div>
            <div class="resultado_datos_e">
            </div>
        </div>
        `;
        const b = document.querySelector("body");
        rdo.appendChild(section);
        if(vc.classList.contains("correcto") && r.classList.contains("correcto") && c.classList.contains("correcto") && t.classList.contains("correcto")){
            
            rdo.style.display = "block";
            const rdoV = document.querySelector(".resultado_datos_v");
            const rdoE = document.querySelector(".resultado_datos_e");
            const Ev = 0.9;
            const Et = 0.1;
            const Er = 0.8;
            const Ec = 0.0001;
            let E = ["Ev = "+Ev,"Er = "+Er,"Ec = "+Ec,"Et = "+Et];
            const Vo = vc.value;  
            const R = r.value;
            const C = c.value;
            const T =t.value;
            const v = ["Vo = "+Vo,"R = "+R,"C = "+C,"t = "+T];
            v.forEach( ve => {
                //console.log("hola");
                const p = document.createElement("p");
                p.textContent = ve;
                rdoV.appendChild(p);    
            });
            E.forEach( ve => {
                //console.log("hola");
                const p = document.createElement("p");
                p.textContent = ve;
                rdoE.appendChild(p);    
            });
            const Vc = Vo*(1-Math.exp(-T/(R*C)));
            const p = document.createElement("p");
            p.textContent = "Reemplazando en la formula obtendremos el valor de Vc = "+Vc+" entonces la corriente despues de 8 segundos que se cerro el interruptor es:";
            rdo.appendChild(p);
            const I = Vc / R;
            const pa = document.createElement("p");
            pa.textContent = "I = Vc/R entonces I = "+I;
            rdo.appendChild(pa);
            const der = document.createElement("p");
            der.textContent = "Ahora calculamos las derivadas parciales respecto de Vo, R, C y t.";       
            rdo.appendChild(der);
            const dVo = 1- Math.exp(-T/(R*C));
            //console.log("dVo "+dVo);
            const dt = Math.exp(-T/(R*C))*Vo/(R*C);
            //console.log("dt "+dt);
            const dr =  - Math.exp(-T/(R*C))*Vo*T/((Math.pow(R,2))*C);
            //console.log("dr "+dr);
            const dc =  - Math.exp(-T/(R*C))*Vo*T / (R*C*C);
            const Ds = ["dVo = "+dVo,"dR = "+dr,"dC = "+dc,"dt = "+dt];
            Ds.forEach( ve => {
                //console.log("hola");
                const p = document.createElement("p");
                p.textContent = ve;
                rdo.appendChild(p);    
            });
            const a = document.createElement("p");
            a.textContent = "Ahora calculamos:";       
            rdo.appendChild(a);
            const Img = document.createElement("img");
            Img.src = "img/formula_delta.png";
            rdo.appendChild(Img);
            const delta = document.createElement("p");
            const EaV = Ev*Math.abs(dVo)+Et*Math.abs(dt)+Er*Math.abs(dr)+Ec*Math.abs(dc);  
            delta.textContent = "Δf = "+EaV;
            rdo.appendChild(delta);
            const Error = document.createElement("p");  
            const ErpV=EaV/ Vc*100;
            Error.textContent = "Entonces el Error relativo porcential es igual a Er% = "+ErpV.toFixed(4)+"%";
            rdo.appendChild(Error);
            const intervalo = document.createElement("p");  
            intervalo.textContent = "El rango del valor exacto es: "+Vc.toFixed(4)+" +- "+EaV+".";
            rdo.appendChild(intervalo);    
        }
        
    }
});

function limpiandoHTML(resultado){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
        return;
    }
}