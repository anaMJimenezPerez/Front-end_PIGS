import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  selectedOption: string = 'profile';
  selectedMenuOption: string = 'my_orders'; 
  orders: any[] = [];

  profilePictureUrl: string | ArrayBuffer | null = null;

  @ViewChild('profileImage') profileImage: ElementRef | undefined;

  profilePictureWidth: number = 200;
  profilePictureHeight: number = 200; 

  selectOption(option: string) {
    this.selectedOption = option;
  }

  /* Orders */
  selectMenuOption(option: string) {
    this.selectedMenuOption = option;
  }

  shouldShowMyOrders(): boolean {
    return this.selectedMenuOption === 'my_orders';
  }

  shouldShowCustomerOrders(): boolean {
    return this.selectedMenuOption === 'customer_orders';
  }

  /* Customers Orders */
  sortOrders(criteria: string): void {
    if (criteria === 'earliest') {
      this.orders.sort((a, b) => a.date - b.date);
    } else if (criteria === 'recent') {
      this.orders.sort((a, b) => b.date - a.date);
    } else if (criteria === 'product') {
      this.orders.sort((a, b) => a.productName.localeCompare(b.productName));
    }
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
  
  /* delete button*/ 
  confirmDelete() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deleted');
    }
  }

}