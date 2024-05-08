import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './newProduct.component.html',
  styleUrls: ['./newProduct.component.css']
})

export class NewProductComponent implements OnInit {
  photos: { src: string, file: File }[] = [];

  // Variable initialization
  product = {
    name: '',
    price: 0,
    quantity: 0,
    date: '',
    category: '',
    subcategories: [],
    description: '',
    photos: [] as { src: string; file: File }[]
  };

  // Variables for displaying error messages
  showSizeError = false;
  showColorError = false;

  constructor(private router: Router) { }

  ngOnInit() {
    // Check if it was accessed from the profile
    const hasAccess = localStorage.getItem('profileAccess') === 'true';

    if (!hasAccess) {
      this.router.navigate(['/profile']);
    } else {
      localStorage.removeItem('profileAccess');
    }

    // Method for displaying the date
    this.setCurrentDate();

    // Displays the fields of the initial category
    const initialCategorySelect = document.getElementById('category') as HTMLSelectElement;
    if (initialCategorySelect) {
      // Select “Clothing” as the first option by default.
      initialCategorySelect.value = 'clothing';

      // Create a real 'change' event 
      const changeEvent = new Event('change', { bubbles: true, cancelable: true });
      initialCategorySelect.dispatchEvent(changeEvent);
    }
  }

  // Date
  setCurrentDate() {
    const createdDateInput = document.getElementById('createdDate') as HTMLInputElement;
    if (createdDateInput) {
      const today = new Date();
      // date: YYYY-MM-DD
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      createdDateInput.value = formattedDate;
  
      // Asigna la fecha formateada al objeto product
      this.product.date = formattedDate;
    }
  }

  // Date for Backend
  formatDateForServer(dateString: string): string {
    const [day, month, year] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }

  // Toggles the visibility of the fieldsets according to the selected category.
  showCategoryFields(event: Event): void {
    const category = (event.target as HTMLSelectElement).value;
    const fieldsets = ['clothingFields', 'jewelryFields', 'keychainFields', 'paintingFields', 'ceramicFields', 'plushFields'];

    fieldsets.forEach((id: string) => {
      const fieldset = document.getElementById(id);
      if (fieldset) {
        fieldset.classList.add('d-none'); // Hide the fieldset
      }
    });

    switch (category) {
      case 'clothing':
        document.getElementById('clothingFields')?.classList.remove('d-none');
        break;
      case 'jewelry':
        document.getElementById('jewelryFields')?.classList.remove('d-none');
        break;
      case 'keychain':
        document.getElementById('keychainFields')?.classList.remove('d-none');
        break;
      case 'painting':
        document.getElementById('paintingFields')?.classList.remove('d-none');
        break;
      case 'ceramic':
        document.getElementById('ceramicFields')?.classList.remove('d-none');
        break;
      case 'plush':
        document.getElementById('plushFields')?.classList.remove('d-none');
        break;
    }
  }

  // Method for handling file selection
  previewPhotos(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.photos.push({ src: e.target!.result as string, file });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // Method to delete a photo by index
  removePhoto(index: number): void {
    this.photos.splice(index, 1);
  }

  // Function to be called when sending the form
  onSubmit(form: any) {
    // Check if there is at least one subcategory selected
    this.showSizeError = !this.hasSelectedCheckboxes('clothingSize');
    this.showColorError = !this.hasSelectedCheckboxes('clothingColor');

    // Check if the form is valid and there are no subcategory errors.
    if (form.valid && !this.showSizeError && !this.showColorError) {
      
    this.product.name = form.value.productName;
    this.product.price = form.value.productPrice;
    this.product.quantity = form.value.productQuantity;
    this.product.date = this.formatDateForServer(form.value.createdDate); // Formatear para enviar al servidor
    this.product.category = form.value.category;
    this.product.description = form.value.productDescription;
    this.product.photos = this.photos;
      
      
      console.log('Form Submitted:', this.product);
      this.sendFormDataToServer(form.value);
      form.reset();
      this.photos = [];
      /*this.router.navigate(['/profile']);*/
    } else {
      console.log('Form has errors');
    }
  }

  sendFormDataToServer(formData: any) {
    console.log('Sending form data to server:', formData);
  }

  // Function to check if checkboxes are selected
  hasSelectedCheckboxes(groupName: string): boolean {
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]:checked`);
    return checkboxes.length > 0;
  }

}