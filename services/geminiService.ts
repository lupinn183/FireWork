
import { GoogleGenAI } from "@google/genai";

// Fix: Always use the mandatory named parameter for apiKey and direct .text property access.
export const generateLoveNote = async (location: string, title: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Hãy viết một đoạn ghi chú kỉ niệm lãng mạn và sâu sắc cho một cặp đôi vừa đi chơi tại ${location} với chủ đề "${title}". Văn phong nhẹ nhàng, chân thành, giống như nhật ký tình yêu. Dưới 40 từ.`,
    });
    
    // Use .text property directly as per guidelines.
    return response.text?.trim() || "Mỗi bước chân ta đi cùng nhau đều là một mảnh ghép của hạnh phúc.";
  } catch (error) {
    console.error("Error generating note:", error);
    return "Nơi nào có em, nơi đó là nhà.";
  }
};

// Add generateGreeting for the AddBranchModal component.
export const generateGreeting = async (prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Hãy viết một lời chúc Tết Quý Tỵ 2025 ý nghĩa dựa trên gợi ý: ${prompt}. Lời chúc ngắn gọn, hay, mang âm hưởng mùa xuân. Dưới 30 từ.`,
    });
    
    return response.text?.trim() || "Chúc mừng năm mới, vạn sự như ý!";
  } catch (error) {
    console.error("Error generating greeting:", error);
    return "Chúc mừng năm mới, an khang thịnh vượng!";
  }
};
