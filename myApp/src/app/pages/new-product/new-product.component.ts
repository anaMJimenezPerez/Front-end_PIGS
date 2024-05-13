import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/interfaces/product';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { ProductImage } from '../../interfaces/productimage';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {
  validateOnLoad = true;
  loggedUser = this.authService.getLoggedUser();

  productImages: ProductImage = {
    id: 0,
    imageUrl: '',
    productId: 0,
  };

  // Variable initialization
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    sellerId: this.loggedUser.id,
    stock: 0,
    creationTime: '',
    tag: '',
    description: '',
    size: '',
    color: '',
    type: '' // type for jewelry and ceramic
  };
  
  productsaved: Product = {
    id: 0,
    name: '',
    price: 0,
    sellerId: this.loggedUser.id,
    stock: 0,
    creationTime: '',
    tag: '',
    description: '',
    size: '',
    color: '',
    type: '' 
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

  constructor(private router: Router, private ProductService: ProductService, private authService: AuthUserService) { }

  ngOnInit() {

    // Check if it was accessed from the profile
    const hasAccess = localStorage.getItem('profileAccess') === 'true';
    if (!hasAccess) {
      this.router.navigate(['/products-profile']);
    } else {
      localStorage.removeItem('profileAccess');
    }

    // Method for displaying the date
    this.setCurrentDate();
    // Method for initial category
    this.setInitialCategory();

  }

  /* method to script url 
  async onFileSelected(event: any) {
    const imagenFile = event.target.files[0];
    console.log('AQUI ESTA LA IMAGEN', imagenFile);
    const urlUnica = await this.generarUrlUnica(imagenFile);
    console.log('URL única para la imagen:', urlUnica);
  }

  // Method to generate a unique URL for an image
  generarUrlUnica(imagen: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const imagenBytes = new Uint8Array(reader.result as ArrayBuffer);
        const hash = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(imagenBytes));
        const hashString = hash.toString(CryptoJS.enc.Hex);
        const urlUnica = `https://ejemplo.com/imagen/${hashString}`;
        resolve(urlUnica);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(imagen);
    });
  }*/

  // Date method
  setCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    // date: YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}T${('0' + today.getHours()).slice(-2)}:${('0' + today.getMinutes()).slice(-2)}:${('0' + today.getSeconds()).slice(-2)}Z`;
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
    this.product.type = ''; // Adjust based on your specific logic
  }

  handleCategoryChange(event: Event): void {
    const tag = (event.target as HTMLSelectElement).value;
    this.product.tag = tag;

    // Clear type if the new category does not require it
    if (!['clothing', 'jewelry', 'ceramic'].includes(tag)) {
      this.product.type = '';
    }

    this.resetSubcategories();
    this.showCategoryFields(tag);
  }

  // Method for validate checkbox
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
      case 'ceramic':
        this.showTypeError = this.product.type === '';
        this.showColorError = false;
        this.showSizeError = false;
        break;
      case 'plush':
        this.showSizeError = !this.hasSelectedCheckboxes('plushSize');
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
        };
        reader.readAsDataURL(file);
      });
    }
  }


  // Function to be called when sending the form
  onSubmit(productForm: any) {
    const tag = this.product.tag;
    this.validateSubcategories(tag);
  
    // Accede a los valores del formulario usando productForm.value
    const formValues = productForm.value;
    console.log("Submitting form:", formValues);
  
    console.log("Errors before validation:", {
      sizeError: this.showSizeError,
      colorError: this.showColorError,
      typeError: this.showTypeError
    });
  
    this.validateSubcategories(this.product.tag);
  
    console.log("Errors after validation:", {
      sizeError: this.showSizeError,
      colorError: this.showColorError,
      typeError: this.showTypeError
    });
  
    if (productForm.valid && !this.showSizeError && !this.showColorError) {
      // Categories
      this.product.size = this.getSelectedOptions(`${tag}Size`).join(', '); // Convert to comma-separated string
      this.product.color = this.getSelectedOptions(`${tag}Color`).join(', '); 
  
      // Construye el objeto con los campos requeridos
      const productData = {
        id: this.product.id,
        name: this.product.name,
        description: this.product.description,
        sellerId: this.loggedUser.id,
        price: this.product.price,
        creationTime: this.product.creationTime,
        stock: this.product.stock,
        size: this.product.size, 
        type: this.product.type,
        color: this.product.color, 
        tag: this.product.tag
      };

      // Envía los datos al backend
      this.ProductService.createProduct(productData).subscribe((product) => {
        console.log("Product added successfully." , product);
        this.productsaved = product;
      });

      const productImages = {
        id: 0,
        imageUrl: '',
        productId: this.product.id,
      };
      
      this.ProductService.addProductImage(productImages).subscribe((productsaved) => {
        console.log("Product with image", productsaved);
      });

      // Formulario en consola
      console.log('Form Submitted:', productData);
      console.log(productData);

      this.router.navigate(['/products-profile']);
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