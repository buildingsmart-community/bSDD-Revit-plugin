//TODO comments

#region ================== References ===================
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
#endregion

#region ============ Namespace Declaration ============
namespace BsddRevitPlugin.Logic.Utilities
{
    public class UuidFromUri
    {
        private static Guid BsddNamespace = new Guid("b989028b-337b-417f-b917-c4e17384b8c5");

        /**
         * Generate a UUID from a URI.
         *
         * This function generates a consistent UUID from a given URI. This UUID can be used as a Revit parameter ID.
         * The UUID is generated using the SHA-1 hash of the URI, which is then formatted as a UUID.
         *
         * @param input - The URI to generate a UUID from.
         * @returns The generated UUID.
         */
        public static Guid CreateUuidFromUri(string input)
        {
            // Convert the input string to a byte array and compute the hash.
            byte[] data = SHA1.Create().ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Guid using the first 16 bytes of the hash
            Guid hashedGuid = new Guid(data.Take(16).ToArray());

            // Create a deterministic Guid based on the namespace and the hashed Guid
            return CreateGuidV5(BsddNamespace, hashedGuid.ToByteArray());
        }

        /**
         * Generate a UUID v5.
         *
         * This function generates a consistent UUID v5 from a given namespace and name.
         *
         * @param namespaceId - The namespace ID.
         * @param nameBytes - The name bytes.
         * @returns The generated UUID v5.
         */
        private static Guid CreateGuidV5(Guid namespaceId, byte[] nameBytes)
        {
            byte[] namespaceBytes = namespaceId.ToByteArray();
            SwapByteOrder(namespaceBytes);

            byte[] hash;
            using (SHA1 algorithm = SHA1.Create())
            {
                algorithm.TransformBlock(namespaceBytes, 0, namespaceBytes.Length, null, 0);
                algorithm.TransformFinalBlock(nameBytes, 0, nameBytes.Length);
                hash = algorithm.Hash;
            }

            byte[] newGuid = new byte[16];
            Array.Copy(hash, 0, newGuid, 0, 16);

            newGuid[6] = (byte)((newGuid[6] & 0x0F) | (5 << 4));
            newGuid[8] = (byte)((newGuid[8] & 0x3F) | 0x80);

            SwapByteOrder(newGuid);
            return new Guid(newGuid);
        }

        private static void SwapByteOrder(byte[] guid)
        {
            Swap(guid, 0, 3);
            Swap(guid, 1, 2);
            Swap(guid, 4, 5);
            Swap(guid, 6, 7);
        }

        private static void Swap(byte[] guid, int left, int right)
        {
            byte temp = guid[left];
            guid[left] = guid[right];
            guid[right] = temp;
        }
    }
}
#endregion