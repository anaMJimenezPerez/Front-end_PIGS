import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  selectedOption: string = 'profile';
  selectedMenuOption: string = ''; 

  profilePictureUrl: string | ArrayBuffer | null = null;

  @ViewChild('profileImage') profileImage: ElementRef | undefined;

  profilePictureWidth: number = 200; // Ancho deseado del recuadro de la foto de perfil
  profilePictureHeight: number = 200; // Alto deseado del recuadro de la foto de perfil

  selectOption(option: string) {
    this.selectedOption = option;
  }

  selectMenuOption(option: string) {
    this.selectedMenuOption = option;
  }

  shouldShowMyOrders(): boolean {
    return this.selectedMenuOption === 'my_orders';
  }

  shouldShowCustomerOrders(): boolean {
    return this.selectedMenuOption === 'customer_orders';
  }

  /* icon */
  selectProfilePicture() {
    const inputElement = document.getElementById('profile-picture');
    if (inputElement) {
      inputElement.click();
    }
  }

  onProfilePictureSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePictureUrl = e.target.result;
        if (this.profileImage) {
          this.profileImage.nativeElement.onload = () => {
            this.adjustImageSize();
          };
        }
      };
      reader.readAsDataURL(file);
    }
  }

  /* resize icon  */
  adjustImageSize() {
    if (this.profileImage) {
      const img = this.profileImage.nativeElement;
      const container = img.parentElement;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const imgWidth = img.width;
      const imgHeight = img.height;

      if (imgWidth && imgHeight) {
        const containerRatio = containerWidth / containerHeight;
        const imgRatio = imgWidth / imgHeight;

        if (containerRatio > imgRatio) {
          img.style.width = '100%';
          img.style.height = 'auto';
        } else {
          img.style.width = 'auto';
          img.style.height = '100%';
        }
      }
    }
  }

  /* delete icon  */
  removeProfilePicture(event: MouseEvent) {
    if (event.button === 2 && this.profilePictureUrl) { // Verifica si el clic fue con el botón derecho y si hay una imagen
      event.preventDefault(); // Evita que se abra el menú contextual predeterminado del navegador
      if (window.confirm('Are you sure you want to delete the image?')) {
        this.profilePictureUrl = null; // Elimina la imagen estableciendo su URL a null
      }
    }
  }
  
  /* delete button*/ 
  confirmDelete() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Aquí puedes agregar la lógica para eliminar la cuenta
      console.log('Account deleted');
    }
  }

}