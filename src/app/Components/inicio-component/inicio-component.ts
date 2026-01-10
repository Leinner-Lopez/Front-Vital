import { Component } from '@angular/core';


@Component({
  selector: 'app-inicio-component',
  imports: [],
  templateUrl: './inicio-component.html',
  styleUrl: './inicio-component.css',
})
export class InicioComponent {
  díasSemana: string[] = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  nombreUser:string = "Leinner Lopez";
  fechaFormateada = this.getFechaFormateada();

  getFechaFormateada(): string {
    const fecha:Date = new Date();
    const diaSemana:string = this.díasSemana[fecha.getDay()];
    const dia:number = fecha.getDate();
    const mes:string = fecha.toLocaleDateString('es-ES', {month:'long'});
    return `${diaSemana}, ${dia} de ${mes}`;
  }

}
