import { useState } from 'react';

const DateFormatter = () => {
  const [formattedDate, setFormattedDate] = useState('');

  const formatDate = (date: string | number | Date) => {
    if (!date) return '';
    
    const dateObj = new Date(date);
    // Get month, day, and year
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    
    // Format as MM/DD/YYYY
    return `${month}-${day}-${year}`;
  };

  const handleDateChange = (e: { target: { value: any; }; }) => {
    const selectedDate = e.target.value;
    const formatted = formatDate(selectedDate);
    setFormattedDate(formatted);
  };
  console.log('date',formattedDate)
  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date:
        </label>
        <input
          type="date"
          value={formattedDate}
          onChange={handleDateChange}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      
    </div>
  );
};

export default DateFormatter;