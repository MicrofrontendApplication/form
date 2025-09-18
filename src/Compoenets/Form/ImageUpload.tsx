import { useState, ChangeEvent } from "react";
import axios from "axios";

const ImageUpload: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>("");

    // Handle file selection
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); // Show preview
        }
    };

    // Handle file upload
    const handleUpload = async () => {
        if (!image) {
            alert("Please select an image first!");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await axios.post<{ fileUrl: string }>(
                "http://localhost:5000/upload",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            setImageUrl(response.data.fileUrl); // Store uploaded image URL
            alert("Image uploaded and stored in MongoDB!");
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload image!");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-4 w-96 mx-auto border rounded-lg shadow-lg text-center bg-white">
            <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mb-2"
            />

            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-40 object-cover mb-3 rounded-lg"
                />
            )}

            <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
                {uploading ? "Uploading..." : "Upload"}
            </button>

            {imageUrl && (
                <div className="mt-4">
                    <h3 className="text-sm font-semibold">Uploaded Image:</h3>
                    <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                        <img
                            src={imageUrl}
                            alt="Uploaded"
                            className="w-full h-40 object-cover rounded-lg"
                        />
                    </a>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
