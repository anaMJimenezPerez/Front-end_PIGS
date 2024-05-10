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
    stock: 0,
    creationTime: '',
    tag: '',
    description: '',
    photos: [] as { src: string; file: File }[],
    size: [] as string[],
    color: [] as string[],
    type: '' // type for jelwery and ceramic
  
  };

  // Value of the checkboxes
  clothingSizes = [
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' }
  ];

  clothingColors = [
    { value: 'white', label: 'White' },
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'orange', label: 'Orange' },
    { value: 'violet', label: 'Violet' },
    { value: 'pink', label: 'Pink' },
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
    { value: 'pink', label: 'Pink' },
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
  showTypeError = false; 

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
    this.product.creationTime = formattedDate;
  }


  // Displays the fields of the initial category
  setInitialCategory() {
    const initialCategorySelect = document.getElementById('tag') as HTMLSelectElement;
    if (initialCategorySelect) {
      // Select “Clothing” as the first option by default.
      initialCategorySelect.value = 'clothing';
      this.showCategoryFields('clothing');
    }
  }

  // Toggles the visibility of the fieldsets according to the selected category.
  showCategoryFields(tag: string) {
    // List of all fieldsets (category-specific fields)
    const fieldsets = ['clothingFields', 'jewelryFields', 'keychainFields', 'paintingFields', 'ceramicFields', 'plushFields'];
    fieldsets.forEach(id => {
      const fieldset = document.getElementById(id);
      if (fieldset) fieldset.classList.add('d-none');
    });

    // Reset the subcategories for the newly selected category
    this.resetSubcategories();

    // Display the correct fieldset based on the selected category
    document.getElementById(`${tag}Fields`)?.classList.remove('d-none');
    this.validateSubcategories(tag);
  }

  resetSubcategories() {
    // Clear subcategory values
    this.product.size = [];
    this.product.color = [];
    this.product.type = ''; // Adjust based on your specific logic
  }

  handleCategoryChange(event: Event): void {
    const tag= (event.target as HTMLSelectElement).value;
    this.showCategoryFields(tag);
  }

  validateSubcategories(tag: string): void {
    switch (tag) {
      case 'clothing':
        this.showSizeError = !this.hasSelectedCheckboxes('clothingSize');
        this.showColorError = !this.hasSelectedCheckboxes('clothingColor');
        this.showTypeError = this.product.type === '';
        break;
      case 'jewelry':
        this.showSizeError = !this.hasSelectedCheckboxes('jewelrySize');
        this.showColorError = !this.hasSelectedCheckboxes('jewelryColor');
        this.showTypeError = this.product.type === '';
        break;
      case 'keychain':
        this.showSizeError = !this.hasSelectedCheckboxes('keychainSize');
        this.showColorError = !this.hasSelectedCheckboxes('keychainColor');
        this.showTypeError = false;
        break;
      case 'painting':
        this.showSizeError = !this.hasSelectedCheckboxes('paintingSize');
        this.showColorError = false;
        this.showTypeError = false;
        break;
      case 'plush':
        this.showSizeError = !this.hasSelectedCheckboxes('plushSize');
        this.showColorError = false;
        this.showTypeError = false;
        break;
      default:
        this.showSizeError = false;
        this.showColorError = false;
        this.showTypeError = false;
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
    const tag = form.value.tag;
    this.validateSubcategories(tag);

    if (form.valid && !this.showSizeError && !this.showColorError) {
      // Categories
      this.product.size = this.getSelectedOptions(`${tag}Size`);
      this.product.color = this.getSelectedOptions(`${tag}Color`);

      // photos 
      this.product.photos = this.photos;

      // Formulary in console
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

  // Options selected (checkboxes o selects)
  getSelectedOptions(groupName: string): string[] {
    const selected: string[] = [];
    const checkboxes = document.querySelectorAll(`input[name="${groupName}"]:checked`);
    checkboxes.forEach((checkbox) => {
      selected.push((checkbox as HTMLInputElement).value);
    });
    return selected;
  }

}