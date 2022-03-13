export function snackBar(snackBar : any, message:string, color: string, action?:string) {
    snackBar.open(message, action, {
     duration: 4000,panelClass: [color]
   });
 }