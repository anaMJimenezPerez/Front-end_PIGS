import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './newProduct.component.html',
  styleUrls: ['./newProduct.component.css']
})
export class NewProductComponent implements OnInit {
  photos: { src: string, file: File }[] = [];

  validateOnLoad = true;

   // Variable initialization
   product = {
    name: '',
    price: 0,
    quantity: 0,
    date: '',
    category: '',
    description: '',
    photos: [] as { src: string; file: File }[],
    subcategories: {
      sizes: [] as string[],
      colors: [] as string[]
    }
  };

  // Value of the checkboxes
  clothingSizes = [
    { value: 'extrasmall', label: 'Extra small' },
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'extralarge', label: 'Extra large' }
  ];

  clothingColors = [
    { value: 'white', label: 'White' },
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'orange', label: 'Orange' },
    { value: 'violet', label: 'Violet' },
    { value: 'black', label: 'Black' }
  ];

  jewelryColors = [
    { value: 'gold', label: 'Gold' },
    { value: 'silver', label: 'Silver' },
    { value: 'bronze', label: 'Bronze' }
  ];

  jewelrySizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  keychainColors = [
    { value: 'white', label: 'White' },
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'orange', label: 'Orange' },
    { value: 'violet', label: 'Violet' },
    { value: 'black', label: 'Black' }
  ];

  keychainSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  paintingSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  plushSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

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
    // Method for initial category
    this.setInitialCategory();
  }

  // Date method
  setCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
     // date: YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;
    this.product.date = formattedDate;
  }


  // Displays the fields of the initial category
  setInitialCategory() {
    const initialCategorySelect = document.getElementById('category') as HTMLSelectElement;
    if (initialCategorySelect) {
       // Select “Clothing” as the first option by default.
      initialCategorySelect.value = 'clothing';
      this.showCategoryFields('clothing');
    }
  }
  // Toggles the visibility of the fieldsets according to the selected category.
  showCategoryFields(category: string) {
    const fieldsets = ['clothingFields', 'jewelryFields', 'keychainFields', 'paintingFields', 'ceramicFields', 'plushFields'];
    fieldsets.forEach(id => {
      const fieldset = document.getElementById(id);
      if (fieldset) fieldset.classList.add('d-none');
    });

    document.getElementById(`${category}Fields`)?.classList.remove('d-none');
    this.validateSubcategories(category);
  }

  handleCategoryChange(event: Event): void {
    const category = (event.target as HTMLSelectElement).value;
    this.showCategoryFields(category);
  }

  validateSubcategories(category: string): void {
    switch (category) {
      case 'clothing':
        this.showSizeError = !this.hasSelectedCheckboxes('clothingSize');
        this.showColorError = !this.hasSelectedCheckboxes('clothingColor');
        break;
      case 'jewelry':
        this.showSizeError = !this.hasSelectedCheckboxes('jewelrySize'); 
        this.showColorError = !this.hasSelectedCheckboxes('jewelryColor');
        break;
      case 'keychain':
        this.showSizeError = !this.hasSelectedCheckboxes('keychainSize');
        this.showColorError = !this.hasSelectedCheckboxes('keychainColor');
        break;
      case 'painting':
        this.showSizeError = !this.hasSelectedCheckboxes('paintingSize');
        this.showColorError = false; 
        break;
      case 'plush':
        this.showSizeError = !this.hasSelectedCheckboxes('plushSize');
        this.showColorError = false; 
        break;
      default:
        this.showSizeError = false;
        this.showColorError = false;
        break;
    }
  }

  onCheckboxChange(groupName: string): void {
    // Update error variables in real time
    if (groupName.includes('Size')) {
      this.showSizeError = !this.hasSelectedCheckboxes(groupName);
    } else if (groupName.includes('Color')) {
      this.showColorError = !this.hasSelectedCheckboxes(groupName);
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
    const category = form.value.category;
    this.validateSubcategories(category);

    if (form.valid && !this.showSizeError && !this.showColorError) {
      // Recopila las subcategorías seleccionadas
      this.product.subcategories.sizes = this.getSelectedOptions(`${category}Size`);
      this.product.subcategories.colors = this.getSelectedOptions(`${category}Color`);

      // Asigna las fotos al producto
      this.product.photos = this.photos;

      // Imprime el formulario completo en la consola
      console.log('Form Submitted:', this.product);

      /*form.reset();
      this.photos = [];
      this.router.navigate(['/profile']);*/
      this.validateOnLoad = false;
    } else {
      console.log('Form has errors');
    }
  }

  // Function to check if checkboxes are selected
  hasSelectedCheckboxes(groupName: string): boolean {
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]:checked`);
    return checkboxes.length > 0;
  }

  // Obtiene las opciones seleccionadas (checkboxes o selects)
  getSelectedOptions(groupName: string): string[] {
    const selected: string[] = [];
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]:checked`);
    checkboxes.forEach((checkbox) => {
      selected.push((checkbox as HTMLInputElement).value);
    });
    return selected;
  }
}