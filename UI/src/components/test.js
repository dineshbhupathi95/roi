import React, { useState, useEffect } from 'react';

const TestApp = () => {
  const [printers, setPrinters] = useState([]);
  const [kotPrinter, setKotPrinter] = useState(null);
  const [saveAndPrintPrinter, setSaveAndPrintPrinter] = useState(null);

  // Connect to a printer using the Web Bluetooth API dynamically
  const connectToPrinter = async () => {
    try {
      const printer = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true, // Allow any Bluetooth printer
        optionalServices: [] // Leave empty to dynamically discover services
      });

      console.log('Printer:', printer);

      const server = await printer.gatt.connect();
      const services = await server.getPrimaryServices(); // Dynamically get all services
      console.log('Services:', services);

      if (services.length > 0) {
        // Select the first service (this can be updated with custom logic if needed)
        const service = services[0];
        const characteristics = await service.getCharacteristics(); // Get characteristics dynamically
        console.log('Characteristics:', characteristics);

        if (characteristics.length > 0) {
          const characteristic = characteristics[0]; // Select the first characteristic
          setPrinters((prevPrinters) => [...prevPrinters, { printer, server, characteristic }]);
        } else {
          console.error('No characteristics found for the selected service');
        }
      } else {
        console.error('No services found on the printer');
      }

    } catch (error) {
      console.error('Connection failed', error);
    }
  };

  // Send ESC/POS commands to the printer
  const sendEscPosCommands = async (characteristic, text) => {
    const escPosCommands = [
      0x1B, 0x40, // Initialize printer
      0x1B, 0x21, 0x00, // Select font
      ...new TextEncoder().encode(text),
      0x0A // Newline
    ];

    try {
      await characteristic.writeValue(new Uint8Array(escPosCommands));
    } catch (error) {
      console.error('Failed to send data', error);
    }
  };

  // Handle KOT Print
  const handleKotPrint = () => {
    if (kotPrinter || printers.length === 1) {
      const targetPrinter = kotPrinter || printers[0];
      sendEscPosCommands(targetPrinter.characteristic, 'KOT Print Data');
    } else {
      console.error('No printer available for KOT Print');
    }
  };

  // Handle Save & Print
  const handleSaveAndPrint = () => {
    if (saveAndPrintPrinter || printers.length === 1) {
      const targetPrinter = saveAndPrintPrinter || printers[0];
      sendEscPosCommands(targetPrinter.characteristic, 'Save & Print Data');
    } else {
      console.error('No printer available for Save & Print');
    }
  };

  useEffect(() => {
    // Automatically assign printers if more than one is connected
    if (printers.length === 1) {
      setKotPrinter(printers[0]);
      setSaveAndPrintPrinter(printers[0]);
    } else if (printers.length > 1) {
      setKotPrinter(printers[0]);
      setSaveAndPrintPrinter(printers[1]);
    }
  }, [printers]);

  return (
    <div>
      <h1>Bluetooth Printer Integration (Dynamic)</h1>
      <button onClick={connectToPrinter}>Connect to Printer</button>
      <div>
        <button onClick={handleKotPrint}>KOT Print</button>
        <button onClick={handleSaveAndPrint}>Save & Print</button>
      </div>
    </div>
  );
};

export default TestApp;
