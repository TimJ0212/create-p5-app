# p5.js Project Creator

Welcome to the p5.js Project Creator! This command-line tool helps you quickly set up a new p5.js project with a predefined template and necessary configurations.

## Quickstart:

    ```bash
    npx new-p5-app
    ```


## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [Contributing](#contributing)

## Features

- Quickly create a new p5.js project with a template.
- Automatically installs the necessary TypeScript definitions for p5.js.
- Generates a `jsconfig.json` file for better IDE support.

### Future Features
- [ ] npx invocation + documentation
- [ ] PWA Support
- [ ] Deploy Template (Dockerfile, Nginx ?)  

## Requirements

- Node.js (version 18 or higher)
- npm (Node Package Manager)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/TimJ0212/create-p5-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd create-p5-app
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

## Usage

To create a new p5.js project, run the following command in your terminal:

```bash
node index.js
```

You will be prompted to enter a project name. After you provide a name, the tool will:

1. Copy the template files to a new directory with the specified project name.
2. Install the necessary TypeScript definitions for p5.js.
3. Generate a `jsconfig.json` file for IDE support.

Once the process is complete, you will see a success message in the terminal.

## Customization

You can customize the template files located in the `template` directory to fit your project's needs. Modify the HTML, JavaScript, and CSS files as necessary.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

